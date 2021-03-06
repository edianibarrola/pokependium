"""empty message

Revision ID: 81398babfe1a
Revises: 
Create Date: 2021-09-22 22:32:44.776906

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '81398babfe1a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('card',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.String(length=120), nullable=False),
    sa.Column('standard_art', sa.Boolean(), nullable=True),
    sa.Column('standard_qty', sa.Integer(), nullable=True),
    sa.Column('alternate_art', sa.Boolean(), nullable=True),
    sa.Column('alternate_qty', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('card')
    op.drop_table('user')
    # ### end Alembic commands ###
