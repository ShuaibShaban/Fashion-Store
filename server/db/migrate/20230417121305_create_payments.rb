class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.belongs_to :order, null: false, foreign_key: true
      t.string :payment_method, null: false
      t.string :amount, null:false
      t.string :status

      t.timestamps
    end
  end
end
