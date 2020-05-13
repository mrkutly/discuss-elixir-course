defmodule Discuss.Plugs.RequireAuth do
  import Plug.Conn
  import Phoenix.Controller

  alias Discuss.Router.Helpers

  def init(_params) do
  end

  def call(conn, _params) do
    if conn.assigns[:user] do
      # let em pass
      conn
    else
      # show an error message
      conn
      |> put_flash(:error, "You gotta log in.")
      |> redirect(to: Helpers.topic_path(conn, :index))
      |> halt()
    end
  end
end
