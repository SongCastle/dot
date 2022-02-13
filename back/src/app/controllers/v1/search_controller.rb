class V1::SearchController < ApplicationController
  before_action :validate_query!

  private

  def validate_query!
    raise BadRequest, code: 'invalid_query' unless query.is_a?(String) | query.is_a?(Array)
  end

  def query
    @query ||= params[:q].presence
  end
end
