from contextlib import contextmanager
from models import *

@contextmanager
def session_scope(Session):
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
