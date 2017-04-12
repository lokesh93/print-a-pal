class SessionsController < ApplicationController

	def new 
		if current_user
			respond_to do |format|
				format.html { redirect_to '/', error: "Already signed up" }
			end
		end
	end

	def create
	    user = User.find_by_email(params[:email])
	    # If the user exists AND the password entered is correct.
	    if user && user.authenticate(params[:password])
	      # Save the user id inside the browser cookie. This is how we keep the user 
	      # logged in when they navigate around our website.
	      session[:user_id] = user.id
	      redirect_to '/drawings'
	    else
	    # If user's login doesn't work, send them back to the login form.
	      redirect_to '/login'
	    end
	  end

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end

end
