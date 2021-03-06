class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  add_flash_types :error, :another_custom_type

  def current_user
  	begin
    	@current_user ||= User.find(session[:user_id]) if session[:user_id]
    rescue ActiveRecord::RecordNotFound => e
		@current_user = nil
	end
  end

  helper_method :current_user

  def authorize
  	puts current_user
    redirect_to '/login' unless current_user
  end

end
