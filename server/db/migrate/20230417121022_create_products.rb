class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name, null:false
      t.float :price, null:false
      t.text :image_url
      t.text :description
      t.string :gender

      t.timestamps
    end
  end
end
