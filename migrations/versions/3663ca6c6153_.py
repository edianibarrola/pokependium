"""empty message

Revision ID: 3663ca6c6153
Revises: ec7ec8d1980c
Create Date: 2021-08-11 15:50:38.973233

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3663ca6c6153'
down_revision = 'ec7ec8d1980c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('card_set',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('series', sa.String(length=120), nullable=False),
    sa.Column('printedTotal', sa.Integer(), nullable=False),
    sa.Column('total', sa.Integer(), nullable=False),
    sa.Column('ptcgoCode', sa.String(length=120), nullable=False),
    sa.Column('releaseDate', sa.String(length=120), nullable=False),
    sa.Column('updatedAt', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('printedTotal'),
    sa.UniqueConstraint('ptcgoCode'),
    sa.UniqueConstraint('releaseDate'),
    sa.UniqueConstraint('series'),
    sa.UniqueConstraint('total'),
    sa.UniqueConstraint('updatedAt')
    )
    op.drop_table('set')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('set',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('series', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('printedTotal', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('total', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('ptcgoCode', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('releaseDate', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('updatedAt', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='set_pkey'),
    sa.UniqueConstraint('name', name='set_name_key'),
    sa.UniqueConstraint('printedTotal', name='set_printedTotal_key'),
    sa.UniqueConstraint('ptcgoCode', name='set_ptcgoCode_key'),
    sa.UniqueConstraint('releaseDate', name='set_releaseDate_key'),
    sa.UniqueConstraint('series', name='set_series_key'),
    sa.UniqueConstraint('total', name='set_total_key'),
    sa.UniqueConstraint('updatedAt', name='set_updatedAt_key')
    )
    op.drop_table('card_set')
    # ### end Alembic commands ###