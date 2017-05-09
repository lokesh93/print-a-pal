class UserMailer < ActionMailer::Base
    default :from => "podipireddy5@gmail.com"

 def registration_confirmation(user)
    @user = user
    mail(:to => "#{user.name} <#{user.email}>", :subject => "Registration Confirmation")
 end