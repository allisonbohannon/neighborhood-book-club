class UserMailer < ApplicationMailer

    default from: 'notifications@neighborhoodbookclub.com'

    def welcome_email(user)
        @user = params[:user]
        @url  = 'https://neighborhood-book-club.onrender.com'
        mail(to: @user.email, subject: 'Welcome to Neighborhood Book Club')
      end

end
