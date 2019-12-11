class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    # deviseにデフォルト設置されている以外の項目を追加したい場合に記述
    # 例：devise_parameter_sanitizer.permit(:sign_up(処理), keys: [:age](項目))
  end

end