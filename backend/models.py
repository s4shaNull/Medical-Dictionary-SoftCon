from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os 
from dotenv import load_dotenv, find_dotenv
from retry import retry
from contextlib import contextmanager

load_dotenv(find_dotenv())

config = {
    'host' : 'db',
    'port' : 3306,
    'user' : os.getenv("MYSQL_FLASK_USER"),
    'password' : os.getenv("MYSQL_FLASK_PASSWORD"),
    'database' : os.getenv("MYSQL_DATABASE")
}

@retry(tries=5, delay=1)
def connect_to_db():
    engine_name = f"mariadb://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}"
    engine = create_engine(engine_name) #'mariadb://username:password@localhost:3306/database'
    conn = engine.connect()
    return conn

engine = connect_to_db()

# engine_name = f"mariadb://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}"
# engine = create_engine(engine_name) #'mariadb://username:password@localhost:3306/database'
    
Base = declarative_base()

class Dict(Base):
    __tablename__ = 'dict'
    idx = Column(Integer, primary_key=True)
    en = Column(String(length=255))
    vn = Column(String(length=255))
    word_type = Column(String(length=50))
    word_type_vn = Column(String(length=50))

Base.metadata.create_all(bind=engine)
#Session = sessionmaker(bind=engine)
# session = Session()

@contextmanager
def session_scope():
    #self.db_engine = create_engine(self.db_config, pool_pre_ping=True) # echo=True if needed to see background SQL        
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        # this is where the "work" happens!
        yield session
        # always commit changes!
        session.commit()
    except:
        # if any kind of exception occurs, rollback transaction
        session.rollback()
        raise
    finally:
        session.close()