#include "fileio.h"
#include <iostream>
#include <fstream>
#include <QJsonObject>
#include <QPair>
#include <QFile>
#include <QTextStream>
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
        //qDebug() << saveStream;
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

bool FileIO::createNewConfigFile(QString name) {
    std::ifstream f("../config/" + name.toStdString() + ".config");

    if (!f.good()) {
        std::ofstream outfile ("../config/" + name.toStdString() + ".config");
        outfile << this->defaultObject.toJson().toStdString() << std::endl;
        outfile.close();
        f.close();
        return true;
    } else {
        f.close();
        return false;
    }
}

QJsonDocument FileIO::getDefaultDocument() {
    QJsonDocument jDoc;
    QJsonObject optionColor
    {
        {"BACKGROUND_COLOR", "#ffdc73"},
        {"BORDER_BUTTON_COLOR", "#744000"},
        {"FONT_BUTTON_COLOR", "#ffffff"},
        {"FONT_FAMILY", "britannic bold"},
        {"INSIDE_BUTTON_COLOR", "#c77900"}
    };

    QJsonObject option
    {
        {"option", optionColor}
    };

    jDoc.setObject(option);
    return jDoc;
}

FileIO::~FileIO()
{

}


