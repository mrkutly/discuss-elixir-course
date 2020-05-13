defmodule Discuss.Plugs.SetUser do
  import Plug.Conn

  alias Discuss.Repo
  alias Discuss.User

  # this gets run once
  def init(_params) do
  end

  # this gets run on each request
  # _params is actually the return value from init
  def call(conn, _params) do
    user_id = get_session(conn, :user_id)

    cond do
      user = user_id && Repo.get(User, user_id) ->
        assign(conn, :user, user)

      # conn.assigns.user => User struct
      true ->
        assign(conn, :user, nil)
    end
  end
end
