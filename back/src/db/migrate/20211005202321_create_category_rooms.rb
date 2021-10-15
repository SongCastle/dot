class CreateCategoryRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :category_rooms do |t|
      t.string :type
      t.references :category
      t.references :room

      t.timestamps
    end
  end
end
