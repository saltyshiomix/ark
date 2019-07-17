#!/bin/sh

createuser -P -r -d arkuser
createuser -P arkuser_visitor
createdb -O arkuser arkdb

su postgres
