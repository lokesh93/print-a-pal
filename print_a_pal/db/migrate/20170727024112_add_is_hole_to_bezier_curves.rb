class AddIsHoleToBezierCurves < ActiveRecord::Migration
  def change
    add_column :bezier_curves, :is_hole, :boolean
  end
end
