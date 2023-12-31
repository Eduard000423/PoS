import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { product } from 'src/NoSQL/products/products.schema';
import * as XLSX from 'xlsx';
import { rm } from 'fs/promises';

@Injectable()
export class MassiveService {
  constructor(
    @InjectModel(product.name) private productModel: Model<product>,
  ) {}

  async massive(fileName: string) {
    const excel = XLSX.readFile(`./tempLoad/${fileName}`);
    const sheets = excel.SheetNames;

    const json = [];

    const data = XLSX.utils.sheet_to_json(excel.Sheets[sheets[0]]);

    for (let i: number = 0; i < data.length; i++) {
      const dataJson = data[i];
      json.push(dataJson);
    }
    try {
      await this.productModel.insertMany(json);
    } catch (err) {
      return {
        error: 'Formato Excel Incorrecto',
        status: HttpStatus.BAD_REQUEST,
      };
    } finally {
      await rm(`./tempLoad/${fileName}`);
    }
    return { messege: 'Carga Massiva Exitosa', status: HttpStatus.ACCEPTED };
  }
}
