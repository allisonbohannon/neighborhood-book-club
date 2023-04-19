class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # GET /users
  def index
    users = User.all
    render json: users, include: ['reading_lists', 'reading_lists.book']
  end

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
      puts user.errors
    end
  end

  def update
    user = find_user
    user.update!(user_params)
    render json: user
  end

  def me
      user = find_user_by_session
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

  def find_user_by_session
      User.find_by(id: session[:user_id])
  end

  def find_user 
    User.find(params[:id])
  end

    # Only allow a list of trusted parameters through.
  def user_params
    params.permit(:id, :username, :first_name, :last_name, :email, :password, :password_confirmation, :bio, :zipcode, users_attributes: [:id, :username, :first_name, :last_name, :email, :password, :password_confirmation, :bio, :zipcode])
  end

  def render_not_found_response
    render json: { error: "Camper not found" }, status: :not_found
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

end
