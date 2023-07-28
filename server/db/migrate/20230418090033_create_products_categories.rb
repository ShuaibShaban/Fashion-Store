class CreateProductsCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :products_categories do |t|
      t.belongs_to :product, null: false, foreign_key: true
      t.belongs_to :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
