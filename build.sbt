lazy val root = (project in file(".")).
  settings(
    name := """Sazae-san-Janken""",
    version := "1.0-SNAPSHOT",
    scalaVersion := "2.11.8",

    libraryDependencies ++= Seq(
      ws,
      "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test
    )
  ).
  enablePlugins(PlayScala)


