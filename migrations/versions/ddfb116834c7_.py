"""empty message

Revision ID: ddfb116834c7
Revises: 7838bf6b0a99
Create Date: 2021-09-08 22:01:42.941136

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ddfb116834c7'
down_revision = '7838bf6b0a99'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'card', ['card_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'card', type_='unique')
    # ### end Alembic commands ###