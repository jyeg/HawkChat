class CreateIngredients < ActiveRecord::Migration
  def change
    create_table :ingredients do |t|
      t.string :item

      t.timestamps null: false
    end
  end
end
