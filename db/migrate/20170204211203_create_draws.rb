class CreateDraws < ActiveRecord::Migration
  def change
    create_table :draws do |t|

      t.timestamps null: false
    end
  end
end
