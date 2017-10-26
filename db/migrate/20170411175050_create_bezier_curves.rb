class CreateBezierCurves < ActiveRecord::Migration
  def change
    create_table :bezier_curves do |t|
      t.decimal :cp1_x
      t.decimal :cp1_y
      t.decimal :cp2_x
      t.decimal :cp2_y
      t.decimal :sp_x
      t.decimal :sp_y
      t.decimal :ep_x
      t.decimal :ep_y
      t.integer :draw_id

      t.timestamps null: false
    end
  end
end
