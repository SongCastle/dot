class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.references :room, foreign_key: true
      t.references :user, index: true
      t.text :message

      t.timestamps
    end
  end
end
