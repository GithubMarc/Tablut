#include "fileio.h"
#include <QFile>
#include <QTextStream>
#include <QJsonObject>
#include <QJsonDocument>
#include <QDebug>

FileIO::FileIO()
{

}

void FileIO::setPath(QString path) {
    this->path = path;
    return;
}

QString FileIO::getPath() {
    return this->path;
}

QString FileIO::getDefaultPath() {
    QFile file("../config/param.param");
    QString saveStream = "";

    if(file.open(QIODevice::ReadOnly)) {
        QTextStream stream(&file);

        saveStream = stream.readAll();
        saveStream = saveStream.mid(8);
    }
    return saveStream;
}

void FileIO::setDefaultPath(QString path) {
    QFile file("../config/param.param");

    if(file.open(QIODevice::ReadWrite)) {
        file.resize(0);
        file.write(path.toStdString().c_str());
    }

    return;
}

void FileIO::setColor(QString colorLabel, QString color){
    QFile file(this->path);

    if(file.open(QIODevice::ReadWrite)){
        QTextStream stream(&file);

        QString saveStream = stream.readAll();
        QJsonDocument jDoc = QJsonDocument::fromJson(saveStream.toUtf8());
        QJsonObject json = jDoc.object();
        QJsonObject jsonOption = json["option"].toObject();

        jsonOption[colorLabel] = color;

        json["option"] = jsonOption;
        jDoc.setObject(json);

        file.resize(0);
        file.write(jDoc.toJson());

        file.close();
    }

    return;
}

QString FileIO::readFile(QString path){
    QFile file(path);
    QString txt = "";

    if(file.open(QIODevice::ReadWrite)){
    QTextStream stream(&file);
    txt = stream.readAll();
    }

    return txt;
}

QString FileIO::getColor(QString color){
    QString txt = readFile(this->path);
    QJsonDocument jDoc = QJsonDocument::fromJson(txt.toUtf8());

    QJsonObject json = jDoc.object();
    json = json.value("option").toObject();

    return json.value(color).toString();
}

void FileIO::setDefaultColor() {
    QFile file(this->path);

    if(file.open(QIODevice::ReadWrite)){
        QTextStream stream(&file);

        QString saveStream = stream.readAll();
        QJsonDocument jDoc = QJsonDocument::fromJson(saveStream.toUtf8());
        QJsonObject json = jDoc.object();
        QJsonObject jsonOption = json["option"].toObject();

        jsonOption["BACKGROUND_COLOR"] = "#ffdc73";
        jsonOption["INSIDE_BUTTON_COLOR"] = "#c77900";
        jsonOption["BORDER_BUTTON_COLOR"] = "#744000";
        jsonOption["FONT_BUTTON_COLOR"] = "#ffffff";
        jsonOption["FONT_FAMILY"] = "britannic bold";

        json["option"] = jsonOption;
        jDoc.setObject(json);

        file.resize(0);
        file.write(jDoc.toJson());
    }

    return;
}

FileIO::~FileIO()
{

}


