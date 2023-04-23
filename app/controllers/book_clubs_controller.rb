class BookClubsController < ApplicationController
  before_action :set_book_club, only: [:show, :update, :destroy]

  # GET /book_clubs
  def index
    @book_clubs = BookClub.all

    render json: @book_clubs, include: ['book', 'book_club_members', 'book_club_members.user', 'book_club_members.messages']
  end

  # GET /book_clubs/1
  def show
    render json: @book_club, include: ['book', 'book_club_members', 'book_club_members.user', 'book_club_members.messages']
  end

  # POST /book_clubs
  def create
    @book_club = BookClub.new(book_club_params)
    @user = User.find_by(id: session[:user_id])

    if @book_club.save
      BookClubMember.create(book_club_id: @book_club.id, user_id: @user.id, status: "Active")
      render json: @book_club, status: :created, include: ['book', 'book_club_members', 'book_club_members.user', 'book_club_members.messages']
    else
      render json: @book_club.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /book_clubs/1
  def update
    if @book_club.update(book_club_params)
      render json: @book_club, nclude: ['book', 'book_club_members', 'book_club_members.user', 'book_club_members.messages']
    else
      render json: @book_club.errors, status: :unprocessable_entity
    end
  end

  # DELETE /book_clubs/1
  def destroy
    @book_club.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book_club
      @book_club = BookClub.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def book_club_params
      params.require(:book_club).permit(:book_id, :zip_three, :admin, :status, :total_members)
    end
end
