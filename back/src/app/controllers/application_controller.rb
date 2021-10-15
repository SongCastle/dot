class ApplicationController < ActionController::API

  class HttpError < StandardError
    attr_reader :code
    def initialize(code: nil)
      @code = code || self.class.name.demodulize.underscore
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
    render status: e.status, code: e.code
  end
end
