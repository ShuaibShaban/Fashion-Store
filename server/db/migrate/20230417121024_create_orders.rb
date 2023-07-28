class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.float :total_amount, null: false
      t.string :status
      t.string :address

      t.timestamps
    end
  end
end
