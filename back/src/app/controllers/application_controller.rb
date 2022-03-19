class ApplicationController < ActionController::API

  class HttpError < StandardError
    attr_reader :code
    def initialize(args={})
      @code = args[:code] || self.class.name.demodulize.underscore
    end
    def status; nil; end
  end

  class BadRequest < HttpError
    def status; 400; end
  end
  class NotFound < HttpError
    def status; 404; end
  end

  rescue_from HttpError, with: :http_error

  private

  def http_error(e)
    render json: {code: e.code}, status: e.status
  end

  def render_json
    render json: @json || {}
  end
end
