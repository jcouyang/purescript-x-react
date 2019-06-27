with import <nixpkgs> {};
stdenv.mkDerivation rec {
  name = "purescript-x-react";
  env = buildEnv { name = name; paths = buildInputs; };
  nodePath = "export PATH=$(pwd)/node_modules/.bin:$PATH";
  shellHook = nodePath;
  configurePhase = nodePath;
  buildInputs = [
    nodejs-11_x
    (yarn.override { nodejs = nodejs-11_x; })
  ];
  buildPhase = "curl 216.58.199.46";
  src = ./.;
}
