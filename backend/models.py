from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Dict(Base):
    __tablename__ = 'dict'
    idx = Column(Integer, primary_key=True)
    en = Column(String(length=255))
    vn = Column(String(length=255))
    word_type = Column(String(length=50))
    word_type_vn = Column(String(length=50))
