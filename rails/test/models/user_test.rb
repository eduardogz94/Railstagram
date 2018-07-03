require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(username: "cbrzn", password: '1', password_confirmation:'1')
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "username should be present" do
    @user.username = ""
    assert_not @user.valid?
  end

  test "password should be present" do
    @user.password = "     "
    assert_not @user.valid?
  end

  test "username should be unique" do
    duplicate_user = @user.dup
    duplicate_user.username = @user.username.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

    test "password should be present (nonblank)" do
    @user.password = @user.password_confirmation = " " * 6
    assert_not @user.valid?
  end


end





# @user = User.new(username: "Example User", password: '1')