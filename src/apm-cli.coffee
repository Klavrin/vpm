fs = require 'fs'
optimist = require 'optimist'
Installer = require './installer'

parseOptions = (args=[]) ->
  options = optimist(args)
  options.usage('Usage: apm <command>')
  options.alias('v', 'version').describe('v', 'Print the apm version')
  options.alias('h', 'help').describe('h', 'Print this usage message')
  remainingArguments = options.argv._
  options.command = remainingArguments.shift()
  options.commandArgs = remainingArguments
  options

module.exports =
  run: (args, callback) ->
    options = parseOptions(args)
    options.callback = callback
    args = options.argv
    command = options.command
    if args.v
      console.log JSON.parse(fs.readFileSync('package.json')).version
    else if args.h
      options.showHelp()
    else if command
      switch command
        when 'install' then new Installer().run(options)
        else console.error "Unrecognized command: #{command}"
    else
      options.showHelp()