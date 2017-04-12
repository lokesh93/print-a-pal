class BezierCurvesController < ApplicationController
  before_action :set_bezier_curf, only: [:show, :edit, :update, :destroy]

  # GET /bezier_curves
  # GET /bezier_curves.json
  def index
    @bezier_curves = BezierCurve.all
  end

  # GET /bezier_curves/1
  # GET /bezier_curves/1.json
  def show
  end

  # GET /bezier_curves/new
  def new
    @bezier_curf = BezierCurve.new
  end

  # GET /bezier_curves/1/edit
  def edit
  end

  # POST /bezier_curves
  # POST /bezier_curves.json
  def create
    @bezier_curf = BezierCurve.new(bezier_curf_params)

    respond_to do |format|
      if @bezier_curf.save
        format.html { redirect_to @bezier_curf, notice: 'Bezier curve was successfully created.' }
        format.json { render :show, status: :created, location: @bezier_curf }
      else
        format.html { render :new }
        format.json { render json: @bezier_curf.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bezier_curves/1
  # PATCH/PUT /bezier_curves/1.json
  def update
    respond_to do |format|
      if @bezier_curf.update(bezier_curf_params)
        format.html { redirect_to @bezier_curf, notice: 'Bezier curve was successfully updated.' }
        format.json { render :show, status: :ok, location: @bezier_curf }
      else
        format.html { render :edit }
        format.json { render json: @bezier_curf.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bezier_curves/1
  # DELETE /bezier_curves/1.json
  def destroy
    @bezier_curf.destroy
    respond_to do |format|
      format.html { redirect_to bezier_curves_url, notice: 'Bezier curve was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def destroy_drawing_curves
    @bezier_curves = BezierCurve.where(:draw_id => params[:draw_id])
    @bezier_curves.each do |b|
      b.destroy
    end
    respond_to do |format|
      format.json { render json: {"message": "curves for drawing destroyed"}  }
    end
  end

  def update_drawing
    puts params[:curves]["0"]
    begin
      @bezier_curves = BezierCurve.where(:draw_id => params[:curves]["0"][:draw_id])
    rescue ActiveRecord::RecordNotFound => e
      @bezier_curves = nil
    end

    if @bezier_curves
      @bezier_curves.each do |b|
        b.destroy
      end
    end

    if params[:curves]["0"][:cp1_x].to_i != -1
      for i in 0..params[:curves].length-1
        b_curf = BezierCurve.new

        b_curf.cp1_x = params[:curves][i.to_s][:cp1_x]
        b_curf.cp1_y = params[:curves][i.to_s][:cp1_y]
        b_curf.cp2_x = params[:curves][i.to_s][:cp2_x]
        b_curf.cp2_y = params[:curves][i.to_s][:cp2_y]
        b_curf.sp_x = params[:curves][i.to_s][:sp_x]
        b_curf.sp_y = params[:curves][i.to_s][:sp_y]
        b_curf.ep_x = params[:curves][i.to_s][:ep_x]
        b_curf.ep_y = params[:curves][i.to_s][:ep_y]
        b_curf.draw_id = params[:curves][i.to_s][:draw_id]
        b_curf.save
      end
    end

    
    respond_to do |format|
      format.json { render json: {"message": "curves for drawing destroyed"}  }
    end

  end

  # def save_curves
  #   @bezier_curves = BezierCurve.where(:draw_id => params[:curves][0][:draw_id])
  #   iter = 0
  #   @bezier_curves.each do |b|
  #      b.update(params[:curves][iter])
  #      iter++
  #   end

  #   respond_to do |format|
  #     format.json { render json: {success: "curves updated for drawing"}  }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bezier_curf
      @bezier_curf = BezierCurve.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def bezier_curf_params
      params.require(:bezier_curf).permit(:cp1_x, :cp1_y, :cp2_x, :cp2_y, :sp_x, :sp_y, :ep_x, :ep_y, :draw_id)
    end
end

