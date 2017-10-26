class CreateDraws < ActiveRecord::Migration
  def change
    create_table :draws do |t|
   	  t.integer :user_id

      t.timestamps null: false
    end
  end
end
