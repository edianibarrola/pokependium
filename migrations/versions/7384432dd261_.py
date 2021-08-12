"""empty message

Revision ID: 7384432dd261
Revises: 3663ca6c6153
Create Date: 2021-08-12 14:40:37.375035

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7384432dd261'
down_revision = '3663ca6c6153'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('card_set', 'name',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    op.alter_column('card_set', 'printedTotal',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('card_set', 'ptcgoCode',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    op.alter_column('card_set', 'releaseDate',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    op.alter_column('card_set', 'series',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    op.alter_column('card_set', 'total',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('card_set', 'updatedAt',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    op.drop_constraint('card_set_name_key', 'card_set', type_='unique')
    op.drop_constraint('card_set_printedTotal_key', 'card_set', type_='unique')
    op.drop_constraint('card_set_ptcgoCode_key', 'card_set', type_='unique')
    op.drop_constraint('card_set_releaseDate_key', 'card_set', type_='unique')
    op.drop_constraint('card_set_series_key', 'card_set', type_='unique')
    op.drop_constraint('card_set_total_key', 'card_set', type_='unique')
    op.drop_constraint('card_set_updatedAt_key', 'card_set', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('card_set_updatedAt_key', 'card_set', ['updatedAt'])
    op.create_unique_constraint('card_set_total_key', 'card_set', ['total'])
    op.create_unique_constraint('card_set_series_key', 'card_set', ['series'])
    op.create_unique_constraint('card_set_releaseDate_key', 'card_set', ['releaseDate'])
    op.create_unique_constraint('card_set_ptcgoCode_key', 'card_set', ['ptcgoCode'])
    op.create_unique_constraint('card_set_printedTotal_key', 'card_set', ['printedTotal'])
    op.create_unique_constraint('card_set_name_key', 'card_set', ['name'])
    op.alter_column('card_set', 'updatedAt',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    op.alter_column('card_set', 'total',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('card_set', 'series',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    op.alter_column('card_set', 'releaseDate',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    op.alter_column('card_set', 'ptcgoCode',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    op.alter_column('card_set', 'printedTotal',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('card_set', 'name',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    # ### end Alembic commands ###
