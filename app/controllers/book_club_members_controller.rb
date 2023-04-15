class BookClubMembersController < ApplicationController
  before_action :set_book_club_member, only: [:show, :update, :destroy]

  # GET /book_club_members
  def index
    @book_club_members = BookClubMember.all

    render json: @book_club_members
  end

  # GET /book_club_members/1
  def show
    render json: @book_club_member
  end

  # POST /book_club_members
  def create
    @book_club_member = BookClubMember.new(book_club_member_params)

    if @book_club_member.save
      render json: @book_club_member, status: :created, location: @book_club_member
    else
      render json: @book_club_member.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /book_club_members/1
  def update
    if @book_club_member.update(book_club_member_params)
      render json: @book_club_member
    else
      render json: @book_club_member.errors, status: :unprocessable_entity
    end
  end

  # DELETE /book_club_members/1
  def destroy
    @book_club_member.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book_club_member
      @book_club_member = BookClubMember.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def book_club_member_params
      params.require(:book_club_member).permit(:user_id, :book_club_id, :status)
    end
end
