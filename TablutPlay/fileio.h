#include <QObject>

#ifndef FILEIO_H
#define FILEIO_H


class FileIO : public QObject
{

    Q_OBJECT

public:
    FileIO();
    Q_INVOKABLE void writeFile(QString path, QString text);
    Q_INVOKABLE QString readFile(QString path);
    Q_INVOKABLE std::string getBackgroundColor(QString path);
    ~FileIO();

};

#endif // FILEIO_H
