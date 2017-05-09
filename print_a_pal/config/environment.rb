# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

# ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
    :address        => 'smtp.gmail.com',
    :domain         => 'printapal.com',
    :port           => 587,
    :user_name      => 'podipireddy5@gmail.com',
    :password       => '123Podi$',
    :authentication => :plain,
    :enable_starttls_auto => true
}
ActionMailer::Base.raise_delivery_errors = true
