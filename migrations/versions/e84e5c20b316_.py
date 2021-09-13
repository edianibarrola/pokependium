"""empty message

Revision ID: e84e5c20b316
Revises: ddfb116834c7
Create Date: 2021-09-13 17:41:05.751017

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e84e5c20b316'
down_revision = 'ddfb116834c7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'username')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('username', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
    # ### end Alembic commands ###