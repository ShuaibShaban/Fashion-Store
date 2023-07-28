class ApplicationController < ActionController::API
  include ActionController::Cookies
  

  # JWT_SECRET = "qqqwrcgff21234OCKS)(WJMW)"

  wrap_parameters format: []

  #  def app_response(status_code: 200, message: "Success", body: nil, serializer: nil)
  #    if serializer
  #      render json: {
  #               status: status_code,
  #               message: message,
  #               body: ActiveModelSerializers::SerializableResource.new(body, serializer: serializer),
  #             }, status: status_code
  #    else
  #      render json: {
  #               status: status_code,
  #               message: message,
  #               body: body,
  #             }, status: status_code
  #    end
  #  end
   def app_response(message: 'success', status: 200, data: nil)
    render json: {
        message: message,
        data: data
    }, status: status
end

  def uid
    jwt_data = decode_data(request.headers["token"])
    jwt_data[0]["user_id"]
  end

  # ENCODE DATA INTO TOKEN
  def encode_data(data)
    
    JWT.encode(data, ENV['JWT_SECRET'], "HS256")
  end

  def decode(token)
    JWT.decode(token, ENV['JWT_SECRET'], true, { algorithm: 'HS256' })
  end

      # store user id in session
      def save_user(id)
        session[:uid] = id
        session[:expiry] = 6.hours.from_now
    end
    
  def authorize
    auth_headers = request.headers['Authorization']
    if !auth_headers
        render json:{message: "Not Authorized"}
    else
        token = auth_headers.split(' ')[1]
        save_user_id(token)
    end
  end

  def save_user_id(token)
    @uid = decode(token)[0]["user_id"].to_i
  end

   def check_admin
       user = User.find_by(id: @uid)
       role = user.roles.where(name: "admin").first
       if role && role.name == "admin"
         true
       end
   end
  #  def current_user
  #   # Retrieve the current user from the session or database
  #   # based on a unique identifier such as a session token or user id
  #   @current_user ||= User.find_by(id: @uid)
  # end


  def not_found(message: "Not found")
    app_response(status_code: 404, message: message)
  end
end
