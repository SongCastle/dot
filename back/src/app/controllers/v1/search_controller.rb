class V1::SearchController < ApplicationController
  before_action :validate_keyword!

  private

  def validate_keyword!
    raise BadRequest, code: 'invalid_keyword' unless keyword.is_a?(String) | keyword.is_a?(Array)
  end

  def keyword
    @keyword ||= params[:keyword].presence
  end
end
