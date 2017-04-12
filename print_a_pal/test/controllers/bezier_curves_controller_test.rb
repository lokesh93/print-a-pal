require 'test_helper'

class BezierCurvesControllerTest < ActionController::TestCase
  setup do
    @bezier_curf = bezier_curves(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:bezier_curves)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create bezier_curf" do
    assert_difference('BezierCurve.count') do
      post :create, bezier_curf: { cp1_x: @bezier_curf.cp1_x, cp1_y: @bezier_curf.cp1_y, cp2_x: @bezier_curf.cp2_x, cp2_y: @bezier_curf.cp2_y, draw_id: @bezier_curf.draw_id, ep_x: @bezier_curf.ep_x, ep_y: @bezier_curf.ep_y, sp_x: @bezier_curf.sp_x, sp_y: @bezier_curf.sp_y }
    end

    assert_redirected_to bezier_curf_path(assigns(:bezier_curf))
  end

  test "should show bezier_curf" do
    get :show, id: @bezier_curf
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @bezier_curf
    assert_response :success
  end

  test "should update bezier_curf" do
    patch :update, id: @bezier_curf, bezier_curf: { cp1_x: @bezier_curf.cp1_x, cp1_y: @bezier_curf.cp1_y, cp2_x: @bezier_curf.cp2_x, cp2_y: @bezier_curf.cp2_y, draw_id: @bezier_curf.draw_id, ep_x: @bezier_curf.ep_x, ep_y: @bezier_curf.ep_y, sp_x: @bezier_curf.sp_x, sp_y: @bezier_curf.sp_y }
    assert_redirected_to bezier_curf_path(assigns(:bezier_curf))
  end

  test "should destroy bezier_curf" do
    assert_difference('BezierCurve.count', -1) do
      delete :destroy, id: @bezier_curf
    end

    assert_redirected_to bezier_curves_path
  end
end
