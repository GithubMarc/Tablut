#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include "fileio.h"

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;

    engine.rootContext()->setContextProperty("FileIO", new FileIO());
    engine.load(QString("../qml/main.qml"));

    return app.exec();
}
