class ChangeColumnNullAndAddCreatorToCategory < ActiveRecord::Migration[6.1]
  def up
    change_column_null(:categories, :name, false)
    add_reference(:categories, :creator)
  end

  def down
    change_column_null(:categories, :name, true)
    remove_reference(:categories, :creator)
  end
end
