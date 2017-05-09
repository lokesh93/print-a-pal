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
	      if user.email_confirmed
	          sign_in user
	        redirect_back_or user
	      else
	        flash.now[:error] = 'Please activate your account by following the 
	        instructions in the account confirmation email you received to proceed'
	        redirect_to '/'
	      end
	      # session[:user_id] = user.id
	      # redirect_to '/drawings'
	    else
	    # If user's login doesn't work, send them back to the login form.
	      flash.now[:error] = 'Invalid email/password combination' # Not quite right!
	      redirect_to '/login'
	    end
	  end

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end

end
