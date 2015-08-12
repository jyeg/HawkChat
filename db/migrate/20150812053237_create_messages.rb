class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :user
      t.string :channel
      t.string :content
      t.timestamps null: false
    end
  end
end
