class AuthenticationController < ApplicationController
  # def create_account
  #   user = User.create(create_params)
  #   if user.valid?
  #     create_user_session(user.id)
  #     token = encode_token(user_id: user.id)
  #     app_response(status_code: 201, message: "Account created successfully", body: {user: user, token:token})
  #   else
  #     app_response(status_code: 422, message: "Invalid input", body: user.errors.full_messages)
  #   end
  # end
  def create_account
    user = User.create(create_params)
    if user.valid?
        save_user(user.id)
        app_response(message: 'Registration was successful', status: :created, data: user)
    else
        app_response(message: 'Something went wrong during registration', status: :unprocessable_entity, data: user.errors)
    end
end


  def login_account
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
     # create_user_session(user.id)
     token = encode_data({user_id: user.id})
     
     render json: {message: "Log in success", body: {user: user,token:token}}
    else
      app_response(status: 401, message: "Invalid username or password")
    end
  end

  def logout_account
    @uid = nil
    app_response(status: 200, message: "Log out successfully")
  end
  
  # Render 404 page for unmapped routes
  def render_404
    not_found
  end

  private

  def create_params
    params.permit(:username, :email, :password)
  end

end
