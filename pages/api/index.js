/* eslint-disable import/no-anonymous-default-export */
import { NextResponse } from "next/server"

export const config = {
  runtime: "experimental-edge"
}

export default (req) => {
  return NextResponse.json({
    data: "Success!"
  })
}