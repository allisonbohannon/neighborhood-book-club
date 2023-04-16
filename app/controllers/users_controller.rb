class UsersController < ApplicationController

  # GET /users
  def index
    users = User.all
    render json: users, include: ['reading_lists', 'reading_lists.book']
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    user = find_user
    user.update(user_params)
    render json: user, include: ['reading_lists', 'reading_lists.book']
  end

  def show 
      user = find_user
      render json: user, include: ['reading_lists', 'reading_lists.book']
  end

  def destroy
      user = find_user
      user.destroy
      head :no_content
  end


private 

  def find_user
      User.find_by(id: session[:user_id])
  end

    # Only allow a list of trusted parameters through.
  def user_params
    params.permit(:username, :first_name, :last_name, :email, :password, :password_confirmation, :bio, :zipcode)
  end

end
