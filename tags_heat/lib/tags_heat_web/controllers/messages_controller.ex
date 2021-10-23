defmodule TagsHeatWeb.MessagesController do
  use TagsHeatWeb, :controller

  def create(conn, params) do
    IO.inspect(params)

    conn
    |> text("RECEBI A REQUISIÇÃO")
  end
end
